'use client';

import { getOrCreateChat } from '@/data/mutations/chat/get-or-create-chat';
import { createClient } from '@/utils/supabase/client';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function GoToChatButton({ user1_id, user2_id }: { user1_id: string, user2_id: string | null }) {
  const router = useRouter();
  const handleClick =async () => {
    const supabase= createClient()
    if(!user2_id) return null;
    const chatId= await getOrCreateChat(supabase, user1_id, user2_id);
    if(!chatId) return;
    router.push(`/chat/${chatId}`);
  };

  return <MessageCircle
              size={30}
              className="text-orange-500 cursor-pointer hover:text-orange-600"
              onClick={handleClick}
            />
}
