import {Pen} from 'lucide-react';
import {Icon} from '../custom/Icon';

export const InfoCard = ({icon, title, children}) => {
    return (
        <div className="rounded-xl bg-slate-grey/10 border border-slate-grey">
            <div className="flex justify-between items-center border-b border-slate-grey/20 px-6 py-4">
                <div className="flex gap-2 items-center font-semibold text-lg">
                    <Icon icon={icon} />
                    <h4>{title}</h4>
                </div>
                <div className="flex gap-2 items-center font-bold text-punch-red">
                    <span>Edit</span>
                    <Icon icon={Pen} size={15} />
                </div>
            </div>
            <div className="mt-2 px-6 py-4">
                {children}
            </div>
        </div>
    );
};
