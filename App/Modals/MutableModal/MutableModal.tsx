import React from "react";
import { ModalWrapper } from "../../Features/Controls";
import { height } from "../../Global/GlobalConstants";
import { useAppSelector } from "../../Store/hooks";

const MutableModal = () => {

    const { view, width } = useAppSelector(state => state.modal.mutableView);

    return (
        <ModalWrapper modalWidth={width} maxHeight={height * 0.7}>
            {view && view}
        </ModalWrapper>
    )
}

export default MutableModal;