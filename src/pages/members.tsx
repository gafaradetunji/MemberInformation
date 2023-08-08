// import { Link, useNavigate } from 'react-router-dom';
import * as React  from 'react';
import { Modal, Backdrop, Box, Fade, Typography } from '@mui/material';
import img from '../assets/gafar.jpeg'
import { useState } from 'react';
import { useMember, MemberInfo } from '../context/membercontext';
import StarRating from '../component/rating';
import { DeleteModal } from '../context/memberReducer';

const Members: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { removeMember, getAllMembers, editMembers, searchMembers } = useMember();
    const manufacturerProduct = getAllMembers();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
    
    const itemsPerPage = 5;
    const [editingMember, setEditingMember] = useState<MemberInfo | null>(null);
    const handleEditClose = () => setEditOpen(false);

    const handleOpen = (id: number) => {
        setDeleteItemId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDeleteItemId(null);
    };

    const handleRemoveMember = () => {
        if (deleteItemId !== null) {
            removeMember(deleteItemId);
        }
        handleClose();
    };
    const handleEditMember = (member: MemberInfo) => {
        setEditingMember(member);
        setEditOpen(true);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        searchMembers(event.target.value);
    };

    React.useEffect(() => {
        searchMembers(searchQuery);
      }, [searchQuery]);

      const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (editingMember) {
          editMembers(editingMember.id, {
            name: editingMember.name,
            username: editingMember.username,
            email: editingMember.email,
            city: editingMember.address?.city,
          });
          setEditOpen(false);
          setEditingMember(null);
        }
      }
      const handleRatingChange = (newRating: number) => {
        if (editingMember) {
          setEditingMember({ ...editingMember, rating: newRating });
        }
      };

    
    return(
        <main className='md:m-12 m-3 rounded-md p-6'>
            <div className='lg:flex justify-between items-center rounded-md'>
                <p className='text-[1.2rem] mb-4'>Members</p>
                <form action="">
                    <div className="border rounded-md h-[40px] w-[100%] lg:w-[350px] pl-4 flex">
                        <span className="material-symbols-outlined mt-2">search</span>
                        <input 
                            className="placeholder-slate-400 outline-none contrast-more:border-slate-400 w-full contrast-more:placeholder-slate-500"
                            placeholder='Search'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </form>
            </div>
            <div className='lg:w-full mt-[40px] overflow-x-scroll w-[1100px]'>
                <table className='lg:w-full w-[1000px] table-auto'>
                    <thead className='font-normal text-left text-[14px] bg-[#E4F4F3] text-[#707370] w-full'>
                    <tr>
                        <th className=''></th>
                        <th className=''><input type='checkbox' className='w-[15px] h-[20px] me-3'/>Name<span className="material-symbols-outlined">arrow_downward_alt</span></th>
                        <th>Status</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Rating</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className=''>
                        {manufacturerProduct
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map((item, index) => (
                            <tr key={index} className='border items-center h-[70px] pl-8'>
                                <td className=''><input type='checkbox' /></td>
                                <div className='flex mt-4'>
                                    <td className=''><img src={img} alt='' className='h-[40px] w-[40px] rounded-full me-4'/></td>
                                    <div className=''>
                                        <td className='block'>{item.name}</td>
                                        <td className='text-[14px] text-[#707370]'>{item.username}</td>
                                    </div>
                                </div>
                                <td className='uppercase text-[12px]'><span className={`${item.status? 'text-[#004c00] bg-[#b2ffb2]' : 'text-[#df0000] bg-[#FF8A8A]' } font-bold px-2`}>{item.status ? 'Active' : 'inactive'}</span></td>
                                <td className=''>{item.email}</td>
                                <td className=''>{item.address?.city}</td>
                                <td className=''><StarRating rating={item.rating} /></td>
                                <td>
                                    <button className="" onClick={() => handleOpen(item.id)}><span className="material-symbols-outlined text-[#707370] me-5">delete</span></button>
                                    
                                    <button className="" onClick={() => {handleEditMember(item)}}><span className="material-symbols-outlined text-[#707370]">edit</span></button>
                                    {editingMember && (
                                        <Modal
                                            aria-labelledby='transition-modal-title'
                                            aria-describedby='transition-modal-description'
                                            open={editOpen}
                                            onClose={handleEditClose}
                                            closeAfterTransition
                                            slots={{ backdrop: Backdrop }}
                                            slotProps={{
                                                backdrop: {
                                                timeout: 500,
                                                },
                                        }}
                                        >
                                            <Fade in={editOpen}>
                                                <Box className='bg-white lg:w-[400px] absolute md:top-[10%] lg:left-[30%] h-[500px] p-3'>
                                                <Typography id='transition-modal-title' variant='h6' component='h2'>
                                                    Edit Member Details{item.id}
                                                </Typography>
                                                <form onSubmit={handleFormSubmit}>
                                                    <div className='m-4'>
                                                        <label>Name:</label>
                                                        <input
                                                            className='border rounded-md h-[40px] w-[350px] pl-4 flex'
                                                            type='text'
                                                            value={editingMember.name}
                                                            onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className='m-4'>
                                                    <label>Username:</label>
                                                    <input
                                                        className='border rounded-md h-[40px] w-[350px] pl-4 flex'
                                                        type='text'
                                                        value={editingMember.username}
                                                        onChange={(e) => setEditingMember({ ...editingMember, username: e.target.value })}
                                                    />
                                                    </div>
                                                    <div className='m-4'>
                                                    <label>Email:</label>
                                                    <input
                                                        className='border rounded-md h-[40px] w-[350px] pl-4 flex'
                                                        type='text'
                                                        value={editingMember.email}
                                                        onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                                                    />
                                                    </div>
                                                    <div className='m-4'>
                                                    <label>Roles:</label>
                                                    <input
                                                        className='border rounded-md h-[40px] w-[350px] pl-4 flex'
                                                        type='text'
                                                        value={editingMember.city}
                                                        onChange={(e) => setEditingMember({ ...editingMember, city: e.target.value })}
                                                    />
                                                    </div>
                                                    <div>
                                                        <label>Rating:</label>
                                                        <StarRating rating={editingMember.rating} onChange={handleRatingChange} />
                                                    </div>
                                                    <div className='mt-5 text-center'>
                                                    <button type='submit' className='bg-[#df0000] hover:bg-[#df4040] text-white font-normal py-2 px-3 me-4 rounded-md'>Save</button>
                                                    <button type='button' className='hover:bg-[#E4F4F3] text-black font-normal py-2 px-3 me-4 rounded-md' onClick={handleEditClose}>
                                                        Cancel
                                                    </button>
                                                    </div>
                                                </form>
                                                </Box>
                                            </Fade>
                                        </Modal>
                                    )}
                                </td>
                          </tr>
                        ))}
                    </tbody>
                </table> 
                <DeleteModal
                    open={open}
                    onClose={handleClose}
                    onConfirm={handleRemoveMember}
                />   
                <div className='flex justify-between p-8 border w-[1000px] lg:w-full'>
                    <p className='text-[#707370]'>Showing {Math.min(manufacturerProduct.length, currentPage * itemsPerPage)} of {manufacturerProduct.length} results</p>
                    <div>
                        <button className='border hover:bg-[#E4F4F3] px-5 py-2 rounded-md'
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                        <button className='border hover:bg-[#E4F4F3] ml-4 px-5 py-2 rounded-md'
                          disabled={currentPage === Math.ceil(manufacturerProduct.length / itemsPerPage)} 
                          onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </div>
                </div>        
            </div>
        </main>
    )
}

export default Members

