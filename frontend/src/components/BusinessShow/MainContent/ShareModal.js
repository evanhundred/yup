//  <ShareModal
// listenForEsc={listenForEsc}
// handleCloseModal={handleCloseModal}
// copyToClipboard={copyToClipboard}
// CopyIcon={CopyIcon}
// copySuccess={copySuccess}
// textAreaRef={textAreaRef}
// business={business}
// CopySuccessDiv={CopySuccessDiv}
// />

const ShareModal = ({
  listenForEsc,
  handleCloseModal,
  copyToClipboard,
  CopyIcon,
  copySuccess,
  textAreaRef,
  business,
  CopySuccessDiv
}) => {
  if (!business) return null;
  return (
    <div
      className="share-modal-container"
      onLoad={() => {
        listenForEsc();
      }}
    >
      <div
        className="share-modal-overlay"
        onClick={(e) => handleCloseModal(e)}
      />
      <div className="share-modal-box">
        <div className="share-modal-content">
          <div className="share-modal-line-1">
            <h2 className="share-modal-title">Share business</h2>
            <div className="close-x" onClick={(e) => handleCloseModal(e)}>
              X
            </div>
          </div>
          <div className="share-modal-line-2">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fyup.evanryan.dev%2Fbusinesses%2F${business.id}&amp;src=sdkpreparse`}
              className="fb-xfbml-parse-ignore"
            >
              <div className="share-fb">
                <div className="fb-logo-container">f</div>
                <h3>Share on Facebook</h3>
              </div>
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href={`https://twitter.com/intent/tweet?text=Check out this amazing business on Yup.&url=https://yup.evanryan.dev/businesses/${business.id}`}
              className="twitter-share-button"
              data-show-count="false"
            >
              <div className="share-twitter">
                <div className="twitter-logo-container">t</div>
                <h3>Share on Twitter</h3>
              </div>
            </a>
          </div>
          <div className="share-modal-line-3">
            <div className="border-holder">
              <div
                className="link-icon-container"
                onClick={(e) => copyToClipboard(e)}
              >
                <img src={CopyIcon} alt="copy this link" />
                {copySuccess === "Copied!" && <CopySuccessDiv />}
              </div>
              <div className="share-link-input-container">
                <input
                  ref={textAreaRef}
                  className="share-link"
                  defaultValue={`https://yup.evanryan.dev/businesses/${business.id}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
