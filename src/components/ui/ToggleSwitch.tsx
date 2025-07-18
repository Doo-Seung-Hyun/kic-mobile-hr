interface toggleSwitchProps {
    isOn: boolean;
    onClick?: ()=>void;
    classesName?: string;
}

const ToggleSwitch = ({
    isOn = false,
    onClick,
    classesName
}:toggleSwitchProps)=>{
    const backGroundClassName = !isOn ?
        'bg-black opacity-40'
        : 'bg-blue-700 opacity-30';
    return (
        <button className={`p-0.5 rounded-full w-12 ${classesName} ${backGroundClassName}`}
                style={{aspectRatio: 2}}
        >
            <div className={'w-1/2 aspect-square rounded-full bg-white'}></div>
        </button>
    )
}

export default ToggleSwitch;