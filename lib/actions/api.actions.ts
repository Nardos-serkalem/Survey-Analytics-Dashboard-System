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
export const getEducationLevel = async (): Promise<EducationLevel[]> => {
    try {
        const res = await fetch("http://localhost:3002/educationLevel",{ cache: "no-store" });
        const data: EducationLevel[] = await res.json();
        return data;
    } catch (err) {
        console.error("failed to fetch subsity", err);
       return[]
    }
}
export const preferenceOverview = async (): Promise<PreferenceOverview> => {
  try {
    const [time, platform, session] = await Promise.all([
      fetch("http://localhost:3002/time", { cache: "no-store" }).then(
        (res) => res.json() as Promise<PreferenceItem[]>
      ),
      fetch("http://localhost:3002/platform", { cache: "no-store" }).then(
        (res) => res.json() as Promise<PreferenceItem[]>
      ),
      fetch("http://localhost:3002/session", { cache: "no-store" }).then(
        (res) => res.json() as Promise<PreferenceItem[]>
      ),
    ]);
    return { time, platform, session };
  } catch (err) {
    console.error("failed to fetch preference overview", err);
    return { time: [], platform: [], session: [] };
  }
};

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