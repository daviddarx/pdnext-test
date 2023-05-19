import eases from '@/utils/eases';

const drawerChildreMotionVariants = {
  initial: {
    opacity: 0,
    transform: 'translateX(calc(var(--gutter)*2)) translateZ(0)',
  },
  animate: (x: number) => ({
    opacity: 1,
    transform: 'translateX(0) translateZ(0)',
    transition: {
      delay: 0.2 + x * 0.1,
      duration: 0.75,
      ease: eases.outQuart,
    },
  }),
};

export default drawerChildreMotionVariants;
