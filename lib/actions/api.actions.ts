"use server"

export const getGender = async(): Promise<Gender[]>=>{
     try {
        const res = await fetch("http://localhost:3002/gender",{ cache: "no-store" });
        const data: Gender[] = await res.json();
        console.log(data);
        
        return data;
    } catch (err) {
        console.error("failed to fetch subsity", err);
       return[]
    }

}
export const getCourses = async (): Promise<Course[]> => {
    try {
        const res = await fetch("http://localhost:3002/course",{ cache: "no-store" });
        const data: Course[] = await res.json();
        return data;
    } catch (err) {
        console.error("failed to fetch subsity", err);
       return[]
    }
}

export const getSubCity = async(): Promise<SubCity[]>=>{
    try{
     const res = await fetch("http://localhost:3002/subCity", {cache :"no-store"});
     const data : SubCity[] = await res.json();     
     return data;
    }catch(err){
      console.error("unable to fetch subsity", err);
      return []
    }
}
export const getAgeDistribution = async():Promise<AgeDistribution[]>=>{
    try{
       const res = await fetch("http://localhost:3002/age", {cache :"no-store"});
       const data : AgeDistribution[] = await res.json();
       return data;
    }catch(err){
        console.log("unable to fetch data");
        return []
    }
}