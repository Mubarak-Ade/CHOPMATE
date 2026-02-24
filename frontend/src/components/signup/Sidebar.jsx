import {useGlobalContext} from '../../context/GlobalContext';
import {Icon} from '../custom/Icon';
import {Check} from 'lucide-react';
import {NavLink} from 'react-router';
import {links} from '../../links';


export const Sidebar = () => {
    
    const {activePage, index} = useGlobalContext()
    const isLast = links.length - 1;
    
    return (
        <ul className="w-100 border-r border-slate-grey/20 bg-slate-grey/10 min-h-screen p-4 space-y-12">
            {links.map((link, idx) => (
                <NavLink
                    key={idx}
                    to={`/signup/${link.path}`}
                    className={({isActive}) => `flex relative items-center gap-4 ${isActive ? "text-coral-black" : "text-slate-grey/50"} ${idx !== isLast && 'after:absolute after:h-full after:w-0.5 after:-bottom-12 after:left-5 after:bg-slate-grey/20'}`}
                >
                    <button
                        className={`size-10 flex items-center justify-center rounded-full ${idx === index ? "bg-punch-red text-white" : "bg-transparent border border-slate-grey text-slate-grey"} text-xl`}
                    >
                        {index > idx ? <Icon icon={Check} /> : idx + 1}
                    </button>
                    <div className="">
                        <h4 className={`font-bold`}>{link.name}</h4>
                        <p className={`text-sm`}>{link.info}</p>
                    </div>
                </NavLink>
            ))}
        </ul>
    );
};
