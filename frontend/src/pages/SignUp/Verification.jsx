import { ArrowLeft, Lock, TextAlignCenter, Thermometer } from 'lucide-react';
import React from 'react';
// import '../../verify.css';
import { Icon } from '../../components/custom/Icon';

export const Verification = () => {
    return (
        <section className="w-full h-screen flex items-center justify-center">
            <div className="max-w-2xl w-full flex items-center flex-col bg-white p-12 rounded-lg font-sans">
                <div className="bg-punch-red/20 p-4 rounded-full mb-6 text-punch-red">
                    <Icon icon={Lock} />
                </div>

                <h2 className="text-2xl font-bold mb-2">Verify your account</h2>

                <p className="text-slate-grey text-base mb-1">
                    We've send a 6-digit verification code to
                </p>
                <p className="font-medium mb-6">
                    <strong>user@example.com</strong>
                </p>

                <label className="text-slate-grey mb-2">Enter verification code</label>

                <div className="mb-6">
                    <div className="flex gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input type="text" maxLength={1} className='border border-slate-grey size-12 rounded-md' />
                        ))}
                    </div>
                </div>
                <button className="w-full max-w-md mb-4 px-6 py-3 bg-punch-red rounded-lg text-white">Verify Account</button>

                <p className="text-slate-grey text-sm mb-6">
                    Didn't receive the code?{' '}
                    <a href="#">
                        <strong className="resend">Resend code</strong>
                    </a>
                </p>

                <a href="#" className="verify-change-email flex items-center text-slate-grey gap-2 text-sm font-medium">
                    <Icon icon={ArrowLeft} /> change email address
                </a>
            </div>
        </section>
    );
};
