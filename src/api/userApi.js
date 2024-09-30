export const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/all');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  