import { MutableRefObject, useEffect, useState } from 'react';

/**
 * useTruncatedTextTooltip
 * @param itemRef - ref on component inside <Text isTruncated><span ref={itemRef}>{itemContent}</span></Text>
 * @param itemContent - value from ref component
 */

export const useTruncatedTextTooltip = <T extends MutableRefObject<any>, V>(itemRef: T, itemContent: V): boolean => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (itemRef.current) {
      const linkSize = itemRef.current?.offsetWidth!;
      const containerSize = itemRef.current?.parentElement?.parentElement?.offsetWidth!;
      if (linkSize > containerSize) {
        setShowTooltip(true);
      }
    }
  }, [itemContent, itemRef]);

  return showTooltip;
};
