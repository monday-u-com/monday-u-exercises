import { useMemo } from "react";
import "../../App.css";
function ButtonComp({ imgSrc, className, imgClassName, alt, onClick }) {
	const bulidButton = useMemo(() => {
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
	}, [alt, className, imgClassName, imgSrc, onClick]);

	return bulidButton;
}

export default ButtonComp;
