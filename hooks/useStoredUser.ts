import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface StoredUser {
  user: any;
  username: string | null;
}

const useStoredUser = () => {
  const [storedUser, setStoredUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const fetchStoredUser = async () => {
      try {
        const [storedUserString, storedUsername] = await Promise.all([
          AsyncStorage.getItem("user"),
          AsyncStorage.getItem("username"),
        ]);

        setStoredUser({
          user: storedUserString ? JSON.parse(storedUserString) : null,
          username: storedUsername || null,
        });
      } catch (error) {
        console.error(
          "Error loading user and username from AsyncStorage:",
          error
        );
      }
    };

    fetchStoredUser();
  }, []);

  return storedUser;
};

export default useStoredUser;
