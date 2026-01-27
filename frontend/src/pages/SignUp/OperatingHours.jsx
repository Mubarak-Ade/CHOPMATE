import React from 'react';
import clockLogoImg from '../../assets/images/clock-logo.png';
import TimeBreak from '../../components/TimeBreak';
import { Icon } from '../../components/custom/Icon';
import { ArrowLeft } from 'lucide-react';
import {useGlobalContext} from '../../context/GlobalContext';

export function OperatingHours() {
    const { goToNextPage, goToPrevPage } = useGlobalContext();

    return (
        <div className="inner-content">
            <div className="top-bar">
                <h1>Operating Hours</h1>
                <p className="self-text">Let customers know when your open for business</p>
                <div className="red-content">
                    <div className="inner-red-content">
                        <img src={clockLogoImg} alt="clock logo" />
                        <div>
                            <h3>Why update your hours?</h3>
                            <p>
                                Accurate operating hours prevent negative customer experiences and
                                help you appear in search results when your actually open
                            </p>
                        </div>
                    </div>
                </div>
                <div className="week-bar">
                    <span>Weekly Schedule</span>
                    <button>Copy Mon to All</button>
                </div>
                <hr style={{ color: '#0000001a' }} />
            </div>

            <div className="bottom-bar">
                <TimeBreak day="Monday" />
                <TimeBreak day="Tuesday" />
                <TimeBreak day="Wednesday" />
                <TimeBreak day="Thurday" />
                <TimeBreak day="Friday" />
                <TimeBreak day="Saturday" />
                <TimeBreak day="Sunday" />
            </div>

            <hr style={{ color: '#0000001a', margin: '20px 0' }} />
            <div className="btn-container">
                <button onClick={goToPrevPage} className="prev-btn">
                    <Icon icon={ArrowLeft} size={12} />
                    <span>Previous Step</span>
                </button>
                <button onClick={goToNextPage} className="next-btn">Next Step</button>
            </div>
        </div>
    );
}
