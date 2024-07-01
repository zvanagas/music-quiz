'use client';

import { useEffect, useState } from 'react';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { Logo } from '@/components/logo';
import { useToast } from '@/contexts/toast-provider';
import { CheckIcon } from '@/icons/check';
import { Room } from '@/lib/db/rooms/types';
import { useRouter } from 'next/navigation';
import { endpoints } from '@/config/endpoints';

export default function Login() {
  const [name, setName] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [_, setUser] = useSessionStorage('user');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { show } = useToast();
  const router = useRouter();

  const join = async () => {
    if (!name.length || !roomId) {
      show(!roomId ? 'Room ID is missing!' : 'Name is required!', 'error');
      return;
    }

    setUser(name);
    setIsLoading(true);

    try {
      await fetch(`${endpoints.rooms}/${roomId}`).then((response) => {
        if (response.ok) {
          router.push(`/rooms/${roomId}`);
          return;
        }

        show(
          response.status === 404
            ? 'Room not found'
            : 'Unexpected error happened',
          'error'
        );
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchRooms() {
      const availableRooms: Room[] = await fetch(endpoints.rooms).then((res) =>
        res.json()
      );
      setRooms(availableRooms);
    }

    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-10 h-full">
      <Logo />
      <p className="mt-10 text-white">Room ID</p>
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex flex-wrap gap-2">
          {rooms.map((room) => (
            <button
              className={`flex items-center gap-1 rounded-xl text-white cursor-pointer ${
                Number(roomId) === room.id ? 'bg-slate-800' : 'bg-slate-900'
              } hover:bg-slate-700 border border-slate-500 px-2 py-1`}
              key={room.id}
              onClick={() => room.id && setRoomId(room.id.toString())}
            >
              <span>
                {room.id} (by {room.userName})
              </span>
              {Number(roomId) === room.id && <CheckIcon />}
            </button>
          ))}
        </div>
        <input
          className="w-full h-10 rounded bg-transparent border text-white px-4"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <p className="text-white">Name</p>
      <input
        className="w-full h-10 rounded bg-transparent border text-white px-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="w-full bg-blue-800 mt-4 disabled:opacity-60 disabled:cursor-not-allowed rounded py-2 px-4 hover:bg-blue-700 transition-colors text-white"
        onClick={join}
        disabled={isLoading}
      >
        Join
      </button>
    </div>
  );
}
