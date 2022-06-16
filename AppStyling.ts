import { StackCardInterpolationProps, StackCardInterpolatedStyle } from "@react-navigation/stack";
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";

const modalAnimationConfig : TransitionSpec = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  
  export function modalInterpolatedStyle ({current, next, inverted, layouts: { screen }} : StackCardInterpolationProps) : StackCardInterpolatedStyle {

    const cardTranslateY = null;

    return {
      cardStyle: {
        
      },
  
      containerStyle: {
        
      },
    }
  }
 