import React from "react"
import "antd/dist/antd.css"
import "./Breadcrumb.css"
import Breadcrumb from "antd/lib/breadcrumb"
import PropTypes from "prop-types"
import {useLocation} from "react-router";
import {Link} from "react-router-dom"


export default function BreadcrumbComponent() {
    const location = useLocation()
    const {pathname} = location;
    const pathnames = pathname.split("/").filter(item => item)
    //TODO check with include filter for home page breadcrumbs or make home as root page
    const check = pathnames[0] !== "users" && pathnames[0] !== "customers" && pathnames[0] !== "managment"

    return (
        <Breadcrumb className="breadcrumb">
            {pathnames.length > 0 && check && (<Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>)}
            {pathnames.length === 0 && check && (<Breadcrumb.Item>Home</Breadcrumb.Item>)}
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                    <Breadcrumb.Item key={index}>{name[0].toUpperCase() + name.slice(1)}</Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item key={index}><Link
                        to={`${routeTo}`}>{name[0].toUpperCase() + name.slice(1)}</Link></Breadcrumb.Item>
                )
            })}
        </Breadcrumb>
    )
}

BreadcrumbComponent.propTypes = {
    breadcrumbList: PropTypes.arrayOf(PropTypes.Object),
}