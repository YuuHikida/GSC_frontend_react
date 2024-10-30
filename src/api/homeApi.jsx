export const getUserHomeInfo = async()=>{
    try{
        const response = await fetch('http://localhost:8080/loginSuccess',{
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