'use client';

import { useEffect, useState } from 'react';

interface Member {
  _id: string;
  name: string;
  img: string | null;
  resc_id: string | null;
}

const PLACEHOLDER_MEMBERS: Member[] = [
  { _id: 'pm1', name: '', img: null, resc_id: null },
  { _id: 'pm2', name: '', img: null, resc_id: null },
  { _id: 'pm3', name: '', img: null, resc_id: null },
  { _id: 'pm4', name: '', img: null, resc_id: null },
  { _id: 'pm5', name: '', img: null, resc_id: null },
  { _id: 'pm6', name: '', img: null, resc_id: null },
];

const MembersSection = () => {
  const [members, setMembers] = useState<Member[]>(PLACEHOLDER_MEMBERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/team/members');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setMembers(data);
      }
    } catch (err) {
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='py-24 bg-surface-container-low'>
      <div className='container mx-auto px-6 md:px-12'>
        <div className='mb-12'>
          <span className='text-tertiary font-headline font-bold tracking-widest text-xs uppercase block mb-3'>
            CLUB ROSTER
          </span>
          <h2 className='text-white font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none'>
            OUR MEMBERS
          </h2>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
          {members.map((member) => (
            <div
              key={member._id}
              className='group relative overflow-hidden bg-surface-container-highest/40 hover:bg-surface-container-highest transition-colors duration-300'
            >
              <div className='aspect-square overflow-hidden'>
                {member.img ? (
                  <img
                    src={member.img}
                    alt={member.name}
                    className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center bg-surface-container-high'>
                    <svg
                      className='w-16 h-16 text-white/15'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z' />
                    </svg>
                  </div>
                )}
              </div>
              <div className='p-3 border-t border-outline-variant/10'>
                {member.name ? (
                  <>
                    <p className='text-white font-headline font-bold text-xs uppercase tracking-tight leading-tight'>
                      {member.name}
                    </p>
                    {member.resc_id && (
                      <p className='text-tertiary text-[10px] font-bold tracking-widest mt-0.5'>
                        {member.resc_id}
                      </p>
                    )}
                  </>
                ) : (
                  <div className='space-y-1.5'>
                    <div className='h-3 bg-surface-container-high/50 rounded w-3/4'></div>
                    <div className='h-2.5 bg-surface-container-high/30 rounded w-1/2'></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
