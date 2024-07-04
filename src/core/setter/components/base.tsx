const SetterWapper = (Component: React.FC<any>) => {
    return ({ label,...props }: { label?: string} & any) => {
        return <>
            <div className="x-relative">
                {label && <div className='x-h-8 x-text-sm x-flex x-justify-between x-items-center'>{label}</div>}
                <div className="x-w-full x-flex x-items-stretch">
                    <Component {...props} />
                </div>
            </div>

        </>
    }
}

export default SetterWapper;