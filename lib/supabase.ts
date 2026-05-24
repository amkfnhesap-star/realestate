import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import type { Property, PropertyType } from './sampleData';

function rowToProperty(row: Record<string, unknown>): Property {
  return {
    id: row.id as string,
    title: row.title as string,
    price: row.price as number,
    city: row.city as string,
    neighborhood: row.neighborhood as string,
    type: row.type as PropertyType,
    bedrooms: row.bedrooms as number,
    bathrooms: row.bathrooms as number,
    area: row.area as number,
    yearBuilt: row.year_built as number,
    description: row.description as string,
    photos: row.photos as string[],
    featured: row.featured as boolean,
    agentId: row.agent_id as string,
    coordinates: { lat: row.lat as number, lng: row.lng as number },
  };
}

export async function getProperties(): Promise<Property[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from('properties').select('*');
  if (error || !data) return [];
  return data.map(rowToProperty);
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return rowToProperty(data as Record<string, unknown>);
}
