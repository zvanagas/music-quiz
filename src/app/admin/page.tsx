'use client';

import { endpoints } from '@/config/endpoints';
import { useToast } from '@/contexts/toast-provider';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [mode, setMode] = useState<'create' | 'join'>();
  const [_, setUser] = useSessionStorage('user');
  const { show } = useToast();

  const handleCreate = async () => {
    try {
      const { id } = await fetch(endpoints.rooms, {
        method: 'POST',
        body: JSON.stringify({ name }),
      }).then((response) => response.json());

      setUser(name);
      router.push(`/rooms/${id}/admin`);
    } catch {
      //
    }
  };

  const handleJoin = async () => {
    try {
      const response = await fetch(`${endpoints.rooms}/${roomId}`);

      if (response.ok) {
        router.push(`/rooms/${roomId}/admin`);
        return;
      }

      show('Failed to join', 'error');
    } catch {
      show('Failed to join', 'error');
    }
  };

  const renderSelection = () => (
    <div className="flex gap-2">
      <button
        className="text-white p-10 rounded bg-blue-600"
        onClick={() => setMode('create')}
      >
        Create
      </button>
      <button
        className="text-white p-10 rounded bg-green-600"
        onClick={() => setMode('join')}
      >
        Join
      </button>
    </div>
  );

  const renderCreate = () => (
    <>
      <label htmlFor="userName" className="text-white">
        Username
      </label>
      <input
        id="userName"
        className="w-full h-10 rounded bg-transparent border text-white px-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="py-2 px-4 rounded w-full bg-blue-700 mt-4 hover:bg-blue-600 transition-colors text-white"
        onClick={handleCreate}
      >
        Create room
      </button>
    </>
  );

  const renderJoin = () => (
    <>
      <label htmlFor="roomId" className="text-white">
        Room ID
      </label>
      <input
        id="roomId"
        className="w-full h-10 rounded bg-transparent border text-white px-4"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        className="py-2 px-4 rounded w-full bg-blue-700 mt-4 hover:bg-blue-600 transition-colors text-white"
        onClick={handleJoin}
      >
        Join room
      </button>
    </>
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-white">Welcome to Admin</p>
      {!mode && renderSelection()}
      {mode === 'create' && renderCreate()}
      {mode === 'join' && renderJoin()}
    </div>
  );
}
