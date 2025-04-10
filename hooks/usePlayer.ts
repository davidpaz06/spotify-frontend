import { useState, useEffect } from "react";
import { Audio } from "expo-av";

interface UsePlayerReturn {
  isPlaying: boolean;
  currentTrack: string | null;
  play: (url: string) => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
}

const usePlayer = (): UsePlayerReturn => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const play = async (url: string) => {
    try {
      if (!url) {
        throw new Error("No preview URL available");
      }

      if (sound) {
        await sound.unloadAsync(); // Descarga el sonido anterior si existe
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );

      setSound(newSound);
      setCurrentTrack(url);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          setCurrentTrack(null);
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const pause = async () => {
    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stop = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); // Limpia el sonido al desmontar el componente
      }
    };
  }, [sound]);

  return {
    isPlaying,
    currentTrack,
    play,
    pause,
    stop,
  };
};

export default usePlayer;
