interface toggleSwitchProps {
    isOn: boolean;
    onClick?: ()=>void;
    classNames?: string;
}

const ToggleSwitch = ({
    isOn = false,
    onClick: handleButtonClick,
    classNames
}:toggleSwitchProps)=>{
    const backGroundClassName = !isOn ?
        'bg-black opacity-40'
        : 'bg-blue-700';
    const hasWidth = !!classNames?.match(/w-/);
    return (
        <span className={'inline-block text-[0px] leading-none'}>
            <button className={`p-0.5 rounded-full ${classNames} ${backGroundClassName} ${!hasWidth ? 'w-12':''}`}
                    style={{aspectRatio: 2}}
                    onClick={handleButtonClick}
            >
                <div className={'w-1/2 aspect-square rounded-full bg-white ' +
                    'transition-transform ' +
                    `transform ${isOn ? 'translate-x-full' : 'translate-x-0'}`}></div>
            </button>
        </span>
    )
}

export default ToggleSwitch;