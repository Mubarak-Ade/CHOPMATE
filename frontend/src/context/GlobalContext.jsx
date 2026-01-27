import { createContext, useContext, useState } from 'react';
import {useLocation, useNavigate} from 'react-router';
import {links} from '../links';

export const AppContext = createContext(null);

export const useGlobalContext = () => {
	const context = useContext(AppContext)
	if (!context) {
		throw new Error(
			"useNotification must be used within NotificationProvider"
		);
	}
	return context;
}


export const GlobalContext = ({ children }) => {
	const {pathname} = useLocation()
	const navigate = useNavigate()
	const activePage = links.find(link => pathname.includes(link.path)) ?? "/"
	const index = links.findIndex(link => link.path === activePage.path)

	const goToNextPage = () => {
		navigate(`signup/${links[index + 1].path}`)
	}

	const goToPrevPage = () => {
		navigate(`signup/${links[index - 1].path}`)
	}

    return (
        <AppContext.Provider value={{ activePage: activePage.path, goToNextPage, goToPrevPage, index }}>{children}</AppContext.Provider>
    );
};
