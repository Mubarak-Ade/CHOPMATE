import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router';
import { Input } from '../../components/custom/form/Input';

export const Account = () => {
    const { goToNextPage } = useGlobalContext();

    return (
        <div className="w-full p-5">
            <h1 className="font-[1000] text-4xl">Create Your Account</h1>
            <p className="mt-3 text-punch-red">
                Welcome! Let's start by creating your personal administrator account
            </p>

            <form action="" className="mt-5">
                <legend className="text-2xl font-bold">Personal Information</legend>
                <hr className="mt-4 border-slate-grey/20" />
                <Input label={'Full Name'} placeholder={'e.g abdul umar'} />
                <div className="grid w-full mt-4 gap-5 grid-cols-2 ">
                    <Input label={'Email Address'} placeholder={'name@example.com'} />
                    <Input label={'phone Number'} placeholder={'(+234)123456789'} />
                    <Input label={'Role'} placeholder={'Owner'} />
                </div>
                <div className="mt-5 w-full">
                    <h1 className="text-2xl font-bold">Security</h1>
                    <hr className="mt-5 border-slate-grey/20" />
                    <div className="flex mt-5 w-full gap-5">
                        <Input label={'Password'} placeholder={'Create a strong password'} />
                        <Input label={'Confirm Password'} placeholder={'Repeat password'} />
                    </div>
                    <p className="mt-5 text-sm text-punch-red">
                        Password must be at least 8 characters long and include a mix of letters,
                        number, and symbols
                    </p>
                </div>
                <div className="mt-5 bg-punch-red/20 text-punch-red p-5 rounded-xl border border-punch-red">
                    <h4 className="font-bold">Verification Required</h4>
                    <p className="text-sm capitalize mt-2">
                        for security purpose you need to verify your email address and phone number
                        immediately after creating your account please ensure you have access to
                        them
                    </p>
                </div>
                <div className="flex justify-between mt-10 p-5">
                    <p className="text-punch-red/80">
                        Already have an account?{' '}
                        <span className="font-bold text-punch-red">Log in</span>
                    </p>
                    <button
                        onClick={goToNextPage}
                        className="bg-punch-red px-6 py-3 rounded-xl text-white "
                    >
                        Create Account & Verify
                    </button>
                </div>
            </form>
        </div>
    );
};
