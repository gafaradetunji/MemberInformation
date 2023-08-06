import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';


export const api = 'https://jsonplaceholder.typicode.com/users';
type MemberContextType = {
  children: ReactNode;
};

export type MemberInfo = {
  id: number;
  name: string;
  username: string;
  status: boolean;
  email: string;
  city: string;
  rating: number;
  address?: {
    city: string;
  }
};

export const manufacturerProduct: MemberInfo[] = [
    { id: 1, name: 'Christian Nwamba', username: '@christiano', status: true, email: 'ota@gmail.com', city: 'Senior Developer Advocate', rating: 5},
    { id: 2, name: 'Christian Nwamba', username: '@kent', status: true, email: 'ota@gmail.com', city: 'Senior Developer Advocate', rating: 5},
    { id: 3, name: 'Christian Nwamba', username: '@christiano', status: true, email: 'ota@gmail.com', city: 'Senior Developer Advocate', rating: 5},
    { id: 4, name: 'Christian Nwamba', username: '@kent', status: true, email: 'ota@gmail.com', city: 'Senior Developer Advocate', rating: 5},
    { id: 5, name: 'Christian Nwamba', username: '@christiano', status: true, email: 'ota@gmail.com', city: 'Senior Developer Advocate', rating: 5},
]

type MemberContext = {
  getAllMembers: () => MemberInfo[];
  removeMember: (id: number) => void;
  editMembers: (id: number, updatedMemberInfo: Partial<MemberInfo>) => void;
  searchMembers: (query: string) => Promise<void>;
};

const MemberContext = createContext({} as MemberContext);

export const useMember = () => useContext(MemberContext);

export const MemberProvider: React.FC<MemberContextType> = ({ children }: MemberContextType) => {
  const [members, setMembers] = useState<MemberInfo[]>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(api);
      const data = response.data;
      setMembers(data);
    } catch (error) {
      console.error(error);
      setMembers(manufacturerProduct);
    }
  };

  const getAllMembers = () => {
    return members;
  };

  const removeMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const editMembers = (id: number, updatedMemberInfo: Partial<MemberInfo>) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => (member.id === id ? { ...member, ...updatedMemberInfo } : member))
    );
  };

  const searchMembers = async (query: string) => {
    if (query.trim() === '') {
        fetchMembers();
    } else {
      try {
        const response = await axios(`${api}?q=${query}`);
        if (!response.data) {
          throw new Error('Failed to fetch data from the API');
        }
        const data = await response.data;
        setMembers(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <MemberContext.Provider value={{ getAllMembers, removeMember, editMembers, searchMembers }}>
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;
