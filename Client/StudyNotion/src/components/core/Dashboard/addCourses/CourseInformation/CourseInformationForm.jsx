import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
    addCourseDetails,
    editCourseDetails,
    fetchCourseDetails,
} from './../../../../../services/operations/courseDetailsApi'