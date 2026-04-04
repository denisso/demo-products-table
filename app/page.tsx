"use client"
import { addToast } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/actions';

export default function Home() {
  return (
    <Button
      onClick={() =>
        addToast({ message: new Date().toISOString(), color: 'info' })
      }
    >
      Добавить тост
    </Button>
  );
}
