import { useEffect, useRef, useState } from 'react';
import { useOnScreen } from '../../../../../../hooks/useOnScreen';
import classNames from 'classnames';
import styles from './fade-up-box.module.css';

const FadeUpBox = ({delay, children}) => {

    const [componentEnter, setComponentEnter] = useState(false);

    const targetRef = useRef();
    const isOnScreen = useOnScreen(targetRef);
  
    useEffect(() => {
        if(isOnScreen) {
            setComponentEnter(true)
        } 
        
    }, [isOnScreen])

    return ( 
        <div ref={targetRef} className={classNames(styles.box, {[styles.fadeUp]:componentEnter})} style={{transitionDelay: `${delay}s`}}>
            {children}
        </div>

     );
}
 
export default FadeUpBox;