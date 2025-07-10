import { createContext } from "react";

 export const AppContext = createContext()

 const AppContextProvider = (props) => {

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        const age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const ruppes = '₹'

    const value = {
        calculateAge , slotDateFormat , ruppes
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
 }


 export default AppContextProvider

