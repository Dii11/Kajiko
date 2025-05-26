import { Edit, Trash } from 'lucide-react';
import React from 'react';

const ProfileHeadrer = () => {
    return (
      <div className='flex justify-between'>
        <span className="text-bold text-accent text-2xl ">
        Bonjour, Jean

        </span>
        <div className='flex gap-2'>
            <button className='border border-success text-sm p-2 rounded-lg'><Edit className='text-success'/></button>
                        <button className='border border-accent text-sm p-2 rounded-lg'>
                            <Trash className=' text-accent w-5'/>
                        </button>
        </div>
      </div>
    );
};

export default ProfileHeadrer;