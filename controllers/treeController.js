const userData = {
  name: 'Mohandas',
  gender: 'male',
  spouse: { gender: 'female', spouseName: 'Kasturba' },
  parents: { father: 'Karamchand', mother: 'Putlibhai' },
  children: [
    { gender: 'male', childName: 'Harilal' },
    { gender: 'male', childName: 'Manilal' },
    { gender: 'male', childName: 'Ramdas' },
    { gender: 'male', childName: 'Devdas' },
    { gender: 'female', childName: 'Devika' },
    { gender: 'female', childName: 'Ramika' },
  ],
}

const getTree = (req, res) => {
  res.json(userData)
}

export { getTree }
