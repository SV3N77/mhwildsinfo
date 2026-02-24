import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
  if (!str) return '';
  
  const greekMap: Record<string, string> = {
    'α': 'alpha',
    'β': 'beta',
    'γ': 'gamma',
  };
  
  let result = str.toLowerCase();
  
  Object.entries(greekMap).forEach(([greek, replacement]) => {
    result = result.replace(new RegExp(greek, 'g'), replacement);
  });
  
  result = result.replace(/[\s\-–—_\/\\+]+/g, '-');
  result = result.replace(/[^a-z0-9-]/g, '');
  result = result.replace(/-+/g, '-');
  
  return result.replace(/^-+|-+$/g, '');
}
