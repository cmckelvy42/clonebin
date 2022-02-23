import React from "react";

export const GlobeIcon = () => (
    <i className="fa-solid fa-earth-americas"></i>
)

export const LinkIcon = () => (
    <i className="fa-solid fa-link"></i>
)

export const LockIcon = () => (
    <i className="fa-solid fa-lock"></i>
)

export const PrivacyIcon = ({privacy}) => {
    switch (privacy) {
        case 0:
            return(<GlobeIcon/>);
        case 1:
            return(<LinkIcon/>);
        case 2:
            return(<LockIcon/>);
        default:
            return null;
    }
}

export const StopwatchIcon = () => (
    <i className="fa-solid fa-stopwatch"></i>
)

export const CalendarIcon = () => (
    <i className="fa-solid fa-calendar-days"></i>
)

export const UserIcon = () => (
    <i className="fa-solid fa-circle-user"></i>
)

export const EyeIcon = () => (
    <i className="fa-solid fa-eye"></i>
)

export const PencilIcon = () => (
    <i className="fa-solid fa-pencil"></i>
)

export const XIcon = () => (
    <i className="fa-solid fa-x"></i>
)

export const DownIcon = () => (
    <i className="fa-solid fa-angle-down"></i>
)

export const ListIcon = () => (
    <i className="fa-solid fa-list"></i>
)

export const LogoutIcon = () => (
    <i className="fa-solid fa-arrow-right-from-bracket"></i>
)