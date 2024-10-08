'use client'
import { useEffect } from 'react';
import Image from 'next/image'

export default function Home() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);

          // Send the location data to the backend API
          try {
            const res = await fetch('/api/admin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ latitude, longitude }),
            });

            if (!res.ok) {
              throw new Error('Failed to save location');
            }

            const data = await res.json();
            console.log('Location saved with ID:', data.id);
          } catch (error) {
            console.error('Error saving location:', error);
          }
        },
        (error: GeolocationPositionError) => {
          console.error('Error fetching location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <>
      <div>
        <Image src="/Photo.png" alt="Loading..." width={500} height={500} className='w-full h-full' />
      </div>
    </>
  );
}