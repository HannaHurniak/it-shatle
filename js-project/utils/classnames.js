export default (...classes) => classes
  .filter(classname => typeof classname === 'string' && !!classname)
  .join(' ');