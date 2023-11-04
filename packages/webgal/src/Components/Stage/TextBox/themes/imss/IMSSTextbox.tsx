import styles from './imss.module.scss';

export interface ITextboxProps {
  textArray: string[];
  textDelay: number;
  currentConcatDialogPrev: string;
  currentDialogKey: string;
  isText: boolean;
  isSafari: boolean;
  fontSize: string;
  miniAvatar: string;
  showName: string;
  font: string;
  textDuration: number;
}

export default function IMSSTextbox(props: ITextboxProps) {
  const {
    textArray,
    textDelay,
    currentConcatDialogPrev,
    currentDialogKey,
    isText,
    isSafari,
    fontSize,
    miniAvatar,
    showName,
    font,
    textDuration,
  } = props;

  const textElementList = textArray.map((e, index) => {
    if (e === '<br />') {
      return <br key={`br${index}`} />;
    }
    let delay = index * textDelay;
    let prevLength = currentConcatDialogPrev.length;
    if (currentConcatDialogPrev !== '' && index >= prevLength) {
      delay = delay - prevLength * textDelay;
    }
    if (index < prevLength) {
      return (
        <span
          data-text={e}
          id={`${delay}`}
          className={styles.TextBox_textElement_Settled}
          key={currentDialogKey + index}
          style={{ animationDelay: `${delay}ms`, animationDuration: `${textDuration}ms` }}
        >
          <span className={styles.zhanwei}>
            {e}
            <span className={styles.outer}>{e}</span>
            <span className={styles.inner}>{e}</span>
          </span>
        </span>
      );
    }
    return (
      <span
        data-text={e}
        id={`${delay}`}
        className={styles.TextBox_textElement_start}
        key={currentDialogKey + index}
        style={{ animationDelay: `${delay}ms`, position: 'relative' }}
      >
        <span className={styles.zhanwei}>
          {e}
          <span className={styles.outer}>{e}</span>
          <span className={styles.inner}>{e}</span>
        </span>
      </span>
    );
  });
  return (
    <>
      {isText && (
        <div
          id="textBoxMain"
          className={styles.TextBox_main}
          style={{ fontFamily: font, left: miniAvatar === '' ? 25 : undefined }}
        >
          {/* <div className={styles.nameContainer}>{stageState.showName !== ''}</div> */}
          <div id="miniAvatar" className={styles.miniAvatarContainer}>
            {miniAvatar !== '' && <img className={styles.miniAvatarImg} alt="miniAvatar" src={miniAvatar} />}
          </div>
          {showName !== '' && (
            <div key={showName} className={styles.TextBox_showName} style={{ fontSize: '200%' }}>
              {showName.split('').map((e, i) => {
                return (
                  <span key={e + i} style={{ position: 'relative' }}>
                    <span className={styles.zhanwei}>
                      {e}
                      <span className={styles.outerName}>{e}</span>
                      <span className={styles.innerName}>{e}</span>
                    </span>
                  </span>
                );
              })}
            </div>
          )}
          <div
            className={styles.text}
            style={{
              fontSize,
              wordBreak: isSafari ? 'break-word' : undefined,
              overflow: 'hidden',
              paddingLeft: '0.1em',
            }}
          >
            {textElementList}
          </div>
        </div>
      )}
    </>
  );
}