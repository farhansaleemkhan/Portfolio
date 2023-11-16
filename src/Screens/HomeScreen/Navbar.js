import React from 'react'

const Navbar = () => {

  const navbarItem = [
    {
      title: 'Portfolio',
      path: '#portfolio'
    }, 
    {
      title: 'Skills',
      path: '#skill'
    }, 
    {
      title: 'About',
      path: '#about'
    }, 
    {
      title: 'Contact US',
      path: '#contact'
    }
  ];

  return (
    <>
      <div className="bg-slate-700 top-0">
      <nav className="p-7 text-xl flex">
        <h1
          className="px-10 font-black text-2xl text-white uppercase"
        >
          My Portfolio
        </h1>
        <div className='pl-72'>
        <ul className="flex text-white text-right font-bold uppercase">
            {navbarItem.map((item, index) => (
            <a key={index} className="mx-5 pl-8 hover:text-cyan-500" href={item.path}>{item.title}</a>
        ))}
        </ul>
        </div>
      </nav>
    </div>
    </>
  )
}

export default Navbar
