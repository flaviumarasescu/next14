'use client';

const HydrationTest = () => {
  const num = Math.random();
  console.log('number', num);

  return <div>Hidration test {num}</div>;
};

export default HydrationTest;
