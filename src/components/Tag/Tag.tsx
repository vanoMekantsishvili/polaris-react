import React from 'react';
import {CancelSmallMinor} from '@shopify/polaris-icons';
import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {Icon} from '../Icon';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {useFeatures} from '../../utilities/features';

import styles from './Tag.scss';

export interface TagProps {
  /** Content to display in the tag */
  children?: string;
  /** Disables the tag  */
  disabled?: boolean;
  /** Callback when tag is clicked and no remove button is rendered */
  onClick?(): void;
  /** Callback when remove button is clicked or keypressed */
  onRemove?(): void;
}

export function Tag({children, disabled = false, onClick, onRemove}: TagProps) {
  const i18n = useI18n();
  const {newDesignLanguage} = useFeatures();

  const hasOnRemoveOnly = onRemove && !onClick;
  const hasOnClickOnly = onClick && !onRemove;
  const hasOnClickOnRemove = onRemove && onClick;

  const className = classNames(
    styles.Tag,
    disabled && styles.disabled,
    hasOnRemoveOnly && !disabled && styles.removable,
    hasOnClickOnly && !disabled && styles.clickable,
    hasOnClickOnRemove && !disabled && styles.removable,
  );

  const ariaLabel = i18n.translate('Polaris.Tag.ariaLabel', {
    children: children || '',
  });

  const buttonClassName = classNames(
    styles.Button,
    newDesignLanguage && styles.newDesignLanguage,
  );

  return (
    <span
      className={className}
      onClick={hasOnClickOnly && !disabled ? onClick : undefined}
    >
      <span title={children} className={styles.TagText}>
        {children}
      </span>
      {hasOnRemoveOnly || hasOnClickOnRemove ? (
        <button
          type="button"
          aria-label={ariaLabel}
          className={buttonClassName}
          onClick={onRemove}
          onMouseUp={handleMouseUpByBlurring}
          disabled={disabled}
        >
          <Icon source={CancelSmallMinor} />
        </button>
      ) : null}
    </span>
  );
}
