import { notFound } from 'next/navigation';
import { DevGallery } from './DevGallery';

export default function DevPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return <DevGallery />;
}
