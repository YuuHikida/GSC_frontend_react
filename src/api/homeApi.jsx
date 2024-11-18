export const getUserHomeInfo = async()=>{
    try{
        const response = await fetch("http://172.28.16.1.xip.io:8080/auth/authenticate", {
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