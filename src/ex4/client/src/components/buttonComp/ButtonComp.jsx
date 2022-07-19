import "../../App.css";
function ButtonComp({ imgSrc, className, imgClassName, alt, onClick }) {
	return (
		<div
			className={className}
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
		>
			<img className={imgClassName} src={imgSrc} alt={alt} />
		</div>
	);
}

export default ButtonComp;
