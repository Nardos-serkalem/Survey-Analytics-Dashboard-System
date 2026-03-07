
import { FaUser, FaUserFriends, FaDatabase, FaGraduationCap, FaBriefcase, FaSearch, FaFacebook, FaUsers, FaQuestion, FaComments, FaVideo, FaReadme, FaPodcast, FaClock, FaHeart } from 'react-icons/fa';

export const cardsData = [
    {
    "cards": [
        {
            "id": 1,
            "title": "Total Respondents",
            "icon": FaUser,
            "Respondents": 256,
            "age": "18-25 ",
            
        },
        {
            "id": 2,
            "title": "Demographics",
            "icon": FaUserFriends,
            "Students": 128,
            "employed": 64,
            "unemployed": 32,
            
        },
        {
            "id": 3,
            "title": "Gender Distribution", 
            "icon": FaDatabase,
            "Male": 128,
            "Female": 128,
            
        }
    ]
}
  ];

export const Demographic = {
    
    "Students":{
        "Total":256,
        "percentage": 58.9,
        "icon":  FaGraduationCap    
    },
    "employed": {
        "Total":64,
        "percentage": 25,
        "icon": FaBriefcase ,
        "fullTime": 73,
        "partTime": 18
    },
    "unemployed": {
        "Total":32,
        "icon": FaSearch ,
        "percentage": 5.7,
    }
    }

export const Awareness  = {
    "Social Media": {
        "Total": 128,
        "percentage": 50,
        "icon": FaFacebook 
    },
    "Friends and Family": {
        "Total": 64,
        "percentage": 25,
        "icon": FaUsers 
    },
    "not aware": {
        "Total": 64,
        "percentage": 25,
        "icon": FaQuestion 
    }
}
export const trainingPreferences = {
    "Discussion": {
        "Total": 128,
        "percentage": 50,
        "icon": FaComments 
    },
    "Pre-recorded videos": {
        "Total": 64,
        "percentage": 25,
        "icon": FaVideo 
    },
    "Reading materials": {
        "Total": 32,
        "percentage": 12.5,
        "icon": FaReadme
    },
    "In-person sessions": {
        "Total": 32,
        "percentage": 12.5,
        "icon": FaUsers 
    },
    "Podcasts": {
        "Total": 16,
        "percentage": 6.25,
        "icon": FaPodcast 
    }
}
export const challenges = {
    "Lack of time": {
        "Total": 128,
        "percentage": 50,
        "icon": FaClock 
    },
    "Lack of awareness": {
        "Total": 64,
        "percentage": 25,
        "icon": FaSearch 
    },
    "Topics not aligning": {
        "Total": 32,
        "percentage": 12.5, 
        "icon": FaHeart 
    }
}