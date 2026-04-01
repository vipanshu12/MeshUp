import React, { useState, useEffect } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil, X } from 'lucide-react'

const ProfileModal = ({ setShowEdit }) => {
  const user = dummyUserData
  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null,
    full_name: user.full_name,
  })
  const [profilePreview, setProfilePreview] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEditForm({ ...editForm, profile_picture: file })
      setProfilePreview(URL.createObjectURL(file))
    }
  }

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEditForm({ ...editForm, cover_photo: file })
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    // TODO: implement save logic
  }

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview)
      if (coverPreview) URL.revokeObjectURL(coverPreview)
    }
  }, [profilePreview, coverPreview])

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-50 h-screen overflow-y-scroll bg-black/50'>
      <div className='max-w-2xl sm:py-6 mx-auto'>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-bold text-gray-900'>Edit Profile</h1>
            <button onClick={() => setShowEdit(false)} className='p-1 hover:bg-gray-100 rounded'>
              <X className='w-6 h-6' />
            </button>
          </div>

          <form className='space-y-6' onSubmit={handleSaveProfile}>
            {/* Profile Picture */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Profile Picture
              </label>
              <input
                hidden
                type="file"
                accept='image/*'
                id='profile_picture'
                onChange={handleProfilePictureChange}
              />
              <label htmlFor="profile_picture" className='cursor-pointer block'>
                <div className='group/profile relative w-fit'>
                  <img
                    src={profilePreview || user.profile_picture}
                    className='w-24 h-24 rounded-full object-cover shadow'
                    alt="profile"
                  />
                  <div className='absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/40 rounded-full items-center justify-center'>
                    <Pencil className='w-5 h-5 text-white' />
                  </div>
                </div>
              </label>
            </div>

            {/* Cover Photo */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Cover Photo
              </label>
              <input
                hidden
                type="file"
                accept='image/*'
                id='cover_photo'
                onChange={handleCoverPhotoChange}
              />
              <label htmlFor="cover_photo" className='cursor-pointer block'>
                <div className='group/cover relative w-fit'>
                  <img
                    src={coverPreview || user.cover_photo}
                    className='w-80 h-40 rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 object-cover shadow'
                    alt="cover"
                  />
                  <div className='absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/40 rounded-lg items-center justify-center'>
                    <Pencil className='w-5 h-5 text-white' />
                  </div>
                </div>
              </label>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="full_name" className='block text-sm font-medium text-gray-700 mb-1'>
                Full Name
              </label>
              <input
                type="text"
                id='full_name'
                value={editForm.full_name}
                onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                className='w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500'
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className='block text-sm font-medium text-gray-700 mb-1'>
                Username
              </label>
              <input
                type="text"
                id='username'
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                className='w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500'
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className='block text-sm font-medium text-gray-700 mb-1'>
                Bio
              </label>
              <textarea
                id='bio'
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className='w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 resize-none'
                rows="3"
              />
            </div>

            {/* Buttons */}
            <div className='flex gap-3 pt-4'>
              <button
                type='submit'
                className='flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition cursor-pointer'
              >
                Save Changes
              </button>
              <button
                type='button'
                onClick={() => setShowEdit(false)}
                className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg transition cursor-pointer'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal