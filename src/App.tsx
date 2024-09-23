import { useState, useEffect } from 'react';  
import './App.css';  
  
interface Voucher {  
  code: string;  
  used: number;  
}  
  
const VoucherCodeMaker = () => {  
  const [voucherCode, setVoucherCode] = useState('');  
  const [vouchers, setVouchers] = useState<Voucher[]>([]);  
  const [authCode, setAuthCode] = useState('');  
  const [authResult, setAuthResult] = useState('');  
  const [usedCount, setUsedCount] = useState(0);  
  
  useEffect(() => {  
   const storedVouchers = localStorage.getItem('vouchers');  
   if (storedVouchers) {  
    setVouchers(JSON.parse(storedVouchers));  
   }  
  }, []);  
  
  useEffect(() => {  
   localStorage.setItem('vouchers', JSON.stringify(vouchers));  
  }, [vouchers]);  
  
  const generateVoucherCode = () => {  
   const newCode = Math.random().toString(36).substr(2, 10).toUpperCase();  
   setVoucherCode(newCode);  
   setVouchers([...vouchers, { code: newCode, used: 0 }]);  
  };  
  
  const authenticateVoucherCode = () => {  
   const voucher = vouchers.find((v) => v.code === authCode);  
   if (!voucher) {  
    setAuthResult('Invalid voucher code');  
   } else if (voucher.used >= 20) {  
    setAuthResult('Voucher code already used 20 times');  
   } else {  
    setAuthResult('Voucher code is valid');  
    setVouchers(vouchers.map((v) => v.code === authCode ? { ...v, used: v.used + 1 } : v));  
    setUsedCount(voucher.used + 1);  
   }  
  };  
  
  return (  
   <div className="container mx-auto p-4 pt-6 mt-10 bg-pink-100">  
    <h1 className="text-3xl font-bold mb-4 text-pink-500">Voucher Code Maker and Authenticator</h1>  
    <div className="flex flex-col md:flex-row justify-center mb-4">  
      <button  
       className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mr-4"  
       onClick={generateVoucherCode}  
      >  
       Generate Voucher Code  
      </button>  
      <input  
       type="text"  
       value={voucherCode}  
       className="w-full md:w-1/2 p-2 pl-10 text-sm text-pink-700"  
       placeholder="Generated Voucher Code"  
       readOnly  
      />  
    </div>  
    <div className="flex flex-col md:flex-row justify-center mb-4">  
      <input  
       type="text"  
       value={authCode}  
       onChange={(e) => setAuthCode(e.target.value.toUpperCase())}  
       className="w-full md:w-1/2 p-2 pl-10 text-sm text-pink-700"  
       placeholder="Enter Voucher Code to Authenticate"  
      />  
      <button  
       className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded ml-4"  
       onClick={authenticateVoucherCode}  
      >  
       Authenticate Voucher Code  
      </button>  
    </div>  
    <p className="text-lg font-bold mb-4 text-pink-500">{authResult}</p>  
    {usedCount > 0 && (  
      <p className="text-lg font-bold mb-4 text-pink-500">Voucher code used {usedCount} times</p>  
    )}  
   </div>  
  );  
};  
  
export default VoucherCodeMaker;
