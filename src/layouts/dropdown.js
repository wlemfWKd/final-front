import React from "react";

const Dropdowns = (props) => {
  const [visibilityAnimation, setVisibilityAnimation] = React.useState(false);
  const [repeat, setRepeat] = React.useState(null);

  React.useEffect(() => {
    console.log("Visibility Animation:", visibilityAnimation);
    if (props.visibility) {
      clearTimeout(repeat);
      setRepeat(null);
      setVisibilityAnimation(true);
    } else {
      setRepeat(
        setTimeout(() => {
          setVisibilityAnimation(false);
        }, 200)
      );
    }
  }, [props.visibility]);

  return (
    <article
      className={`components-dropdown ${
        visibilityAnimation
          ? "slide-fade-in-dropdown"
          : "slide-fade-out-dropdown"
      }`}
    >
      {visibilityAnimation && props.children}
    </article>
  );
};

export default Dropdowns;
