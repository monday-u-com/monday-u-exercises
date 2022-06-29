import "../App.css";
function ButtonComp({ imgSrc, className, imgClassName, alt, callback }) {
	return (
		<div className={className} onClick={() => callback()}>
			<img className={imgClassName} src={imgSrc} alt={alt} />
		</div>
	);
}

export default ButtonComp;
