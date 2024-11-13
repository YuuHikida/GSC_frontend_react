export const getUserHomeInfo = async()=>{
    try{
        const response = await fetch('https://4cf5-2404-7a81-1840-8a00-f5ff-fc46-8bf8-b302.ngrok-free.app ',{
            method:'GET',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
        });
        if(!response.ok){
            throw new Error('Failed to fetch user information');
        }
        return await response.json();
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
}