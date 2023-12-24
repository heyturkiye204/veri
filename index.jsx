// index.jsx
import React from 'react';
import axios from 'axios';
import useSWR from 'swr';

const discordId = '718374283642011728';

const useDiscordStatus = () => {
  const url = `https://api.lanyard.rest/v1/users/${discordId}`;

  return useSWR(url, async (href) => {
    const response = await axios.get(href);

    if (response.status !== 200) {
      throw new Error('Discord kullanıcı durumu alınamadı.');
    }

    return response.data;
  });
};

const getStatusText = (status) => {
  switch (status) {
    case 'offline':
      return 'Çevrimdışı';
    case 'idle':
      return 'Boşta';
    case 'online':
      return 'Çevrimiçi';
    case 'dnd':
      return 'Rahatsız Etmeyin';
    default:
      return 'Bilinmeyen Durum';
  }
};

const MyComponent = () => {
  const { data, error } = useDiscordStatus();

  if (error) return <div>Hata: {error.message}</div>;
  if (!data) return <div>Yükleniyor...</div>;

  const userStatus = data?.data?.discord_status;
  const statusText = getStatusText(userStatus);

  return (
    <div>
      <p>Discord Kullanıcı Durumu: {statusText}</p>
    </div>
  );
};

export default MyComponent;
